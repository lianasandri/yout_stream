import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";

export default function StreamingControl() {
  const [driveLink, setDriveLink] = useState("");
  const [youtubeKey, setYoutubeKey] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const handleStartStream = async () => {
    if (!driveLink || !youtubeKey) {
      alert("Masukkan link Google Drive dan kode streaming YouTube!");
      return;
    }
    setIsStreaming(true);
    await fetch("/api/start-stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ driveLink, youtubeKey })
    });
  };

  const handleStopStream = async () => {
    setIsStreaming(false);
    await fetch("/api/stop-stream", { method: "POST" });
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <Card className="w-96 p-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Kontrol Streaming</h2>
          <Input 
            placeholder="Masukkan link Google Drive"
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            className="mb-3"
          />
          <Input 
            placeholder="Masukkan kode streaming YouTube"
            value={youtubeKey}
            onChange={(e) => setYoutubeKey(e.target.value)}
            className="mb-3"
          />
          <div className="flex space-x-2">
            <Button onClick={handleStartStream} disabled={isStreaming}>Mulai Streaming</Button>
            <Button onClick={handleStopStream} disabled={!isStreaming} variant="destructive">Stop Streaming</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
