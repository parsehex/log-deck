/** @jsxImportSource preact */
import { useEffect, useState } from "preact/hooks";
import { logHistory } from "../logger";
import {
  Button,
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui";

export function LogViewer() {
  const [logs, setLogs] = useState(logHistory);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Update the logs state when logHistory changes
    const handleLogUpdate = () => {
      setLogs([...logHistory]); // Create a new array reference to trigger re-renders
    };

    // Subscribe to log history changes
    const interval = setInterval(handleLogUpdate, 100); // Periodically check for updates in logHistory

    return () => clearInterval(interval); // Clean up when component unmounts
  }, []);

  console.log(window.pageLoadId);
  return (
    <div className="fixed bottom-4 right-4 w-96 bg-black bg-opacity-80 text-white rounded-lg p-3 shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Log Deck</h2>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>
      </div>

      <ScrollArea className="max-h-60 mt-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Context</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index} className="border-b">
                <TableCell>
                  {new Date(log.timestamp).toLocaleTimeString()}
                </TableCell>
                <TableCell className="font-bold text-green-400">
                  {log.level.toUpperCase()}
                </TableCell>
                <TableCell>{log.message.join(" ")}</TableCell>
                <TableCell>
                  {log.ctx ? (
                    <Collapsible>
                      <CollapsibleTrigger className="text-blue-300 underline">
                        View
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <pre className="bg-gray-800 p-2 rounded">
                          {JSON.stringify(log.ctx, null, 2)}
                        </pre>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    "—"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
