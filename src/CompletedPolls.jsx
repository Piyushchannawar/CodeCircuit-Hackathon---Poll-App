import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { v4 as uuidv4 } from "uuid";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c", "#d0ed57"];

export default function CompletedPolls() {
  const [polls, setPolls] = useState([
    {
      id: uuidv4(),
      question: "What’s your favorite backend language?",
      options: [
        { text: "Go", votes: 60 },
        { text: "Node.js", votes: 45 },
        { text: "Python", votes: 30 },
        { text: "Java", votes: 20 },
      ],
    },
    {
      id: uuidv4(),
      question: "Preferred Cloud Platform?",
      options: [
        { text: "AWS", votes: 50 },
        { text: "GCP", votes: 25 },
        { text: "Azure", votes: 15 },
        { text: "DigitalOcean", votes: 10 },
      ],
    },
  ]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {polls.map((poll) => (
        <Card key={poll.id} className="p-6 shadow-xl">
          <h2 className="text-xl font-medium mb-4 text-center">{poll.question}</h2>
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
