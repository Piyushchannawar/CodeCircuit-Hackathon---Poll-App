import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { v4 as uuidv4 } from "uuid";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c", "#d0ed57"];

export default function Pollcreator() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ id: uuidv4(), text: "" }]);

  const [polls, setPolls] = useState([
    {
      id: uuidv4(),
      question: "What's your favorite programming language?",
      options: [
        { text: "JavaScript", votes: 40 },
        { text: "Python", votes: 30 },
        { text: "Go", votes: 20 },
        { text: "Rust", votes: 10 },
      ],
    },
    {
      id: uuidv4(),
      question: "Which frontend framework do you prefer?",
      options: [
        { text: "React", votes: 50 },
        { text: "Vue", votes: 25 },
        { text: "Angular", votes: 15 },
        { text: "Svelte", votes: 10 },
      ],
    },
  ]);

  // Track user vote per poll by poll ID
  const [userVotes, setUserVotes] = useState({}); // { [pollId]: votedOptionText }

  const addOption = () => {
    setOptions([...options, { id: uuidv4(), text: "" }]);
  };

  const updateOptionText = (id, newText) => {
    setOptions(options.map(opt => (opt.id === id ? { ...opt, text: newText } : opt)));
  };

  const createPoll = () => {
    const validOptions = options.filter(opt => opt.text.trim() !== "");
    if (!question.trim() || validOptions.length < 2) return alert("Enter a question and at least 2 options.");
    const newPoll = {
      id: uuidv4(),
      question,
      options: validOptions.map(opt => ({ text: opt.text, votes: 0 })),
    };
    setPolls([newPoll, ...polls]);
    setQuestion("");
    setOptions([{ id: uuidv4(), text: "" }]);
  };

  const vote = (pollId, optionText) => {
    if (userVotes[pollId]) return; // Prevent double voting
    setUserVotes({ ...userVotes, [pollId]: optionText });
    setPolls(prev =>
      prev.map(p =>
        p.id === pollId
          ? {
              ...p,
              options: p.options.map(opt =>
                opt.text === optionText ? { ...opt, votes: opt.votes + 1 } : opt
              ),
            }
          : p
      )
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Create Poll Section */}
      <Card className="p-6 shadow-xl">
        <h1 className="text-2xl font-semibold mb-4 text-center">Create a Poll</h1>
        <Input
          placeholder="Enter your poll question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-4"
        />
        <div className="space-y-3">
          {options.map((option, index) => (
            <Input
              key={option.id}
              placeholder={`Option ${index + 1}`}
              value={option.text}
              onChange={(e) => updateOptionText(option.id, e.target.value)}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-between gap-3">
          <Button onClick={addOption}>Add Option</Button>
          <Button variant="secondary" onClick={createPoll}>
            Create Poll
          </Button>
        </div>
      </Card>

      {/* Render Polls */}
      {polls.map((poll) => (
        <Card key={poll.id} className="p-6 shadow-xl">
          <h2 className="text-xl font-medium mb-4 text-center">{poll.question}</h2>
          <div className="flex flex-col items-center space-y-3 mb-6">
            {poll.options.map((option) => {
              const isVoted = userVotes[poll.id] === option.text;
              return (
                <Button
                  key={option.text}
                  onClick={() => vote(poll.id, option.text)}
                  className={`w-full max-w-md ${
                    isVoted ? "bg-green-500 text-white hover:bg-green-600" : ""
                  }`}
                  variant={isVoted ? "default" : "outline"}
                  disabled={!!userVotes[poll.id]}
                >
                  {isVoted ? `You voted: ${option.text}` : `Vote for ${option.text}`}
                </Button>
              );
            })}
          </div>
          <CardContent className="flex justify-center">
            <PieChart width={400} height={300}>
              <Pie
                data={poll.options.map(opt => ({ name: opt.text, value: opt.votes }))}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {poll.options.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
