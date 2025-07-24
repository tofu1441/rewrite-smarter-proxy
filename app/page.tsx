'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";

export default function Home() {
  const [input, setInput] = useState('');
  const [tone, setTone] = useState('confident');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    setLoading(true);
    const res = await fetch('/api/rewrite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, tone }),
    });
    const data = await res.json();
    setOutput(data.result);
    setLoading(false);
  };

const [copied, setCopied] = useState(false);

const handleCopy = () => {
  navigator.clipboard.writeText(output);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};


  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">🧠 Rewrite My Text to Sound Smarter</h1>

      <Textarea
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your text here..."
      />

      <Select onValueChange={setTone} defaultValue="confident">
        <SelectTrigger>
          <SelectValue placeholder="Select tone" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="confident">Confident</SelectItem>
          <SelectItem value="professional">Professional</SelectItem>
          <SelectItem value="concise">Concise</SelectItem>
          <SelectItem value="creative">Creative</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleRewrite} disabled={loading}>
        {loading ? 'Rewriting...' : 'Rewrite Text'}
      </Button>

      {output && (
        <div className="bg-gray-100 p-4 rounded border relative">
          <h2 className="font-medium mb-2">✨ Smarter Text:</h2>
          <p className="whitespace-pre-wrap">{output}</p>

          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 text-sm px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}

    </main>
  );
}
