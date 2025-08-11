import { memo, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type Operation = "add" | "sub" | "mul" | "div";

const operations: { key: Operation; label: string }[] = [
  { key: "add", label: "+" },
  { key: "sub", label: "−" },
  { key: "mul", label: "×" },
  { key: "div", label: "÷" },
];

const Calculator = memo(function Calculator() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [operation, setOperation] = useState<Operation>("add");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const onCalculate = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const n1 = num1.trim();
    const n2 = num2.trim();
    if (n1 === "" || n2 === "") {
      setIsLoading(false);
      setError("Please enter both numbers.");
      return;
    }

    try {
      const params = new URLSearchParams({
        num1: n1,
        num2: n2,
        operation, // use words to avoid '+' becoming space
      });

      const res = await fetch("http://localhost:8080/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      const data = (await res.json()) as { result?: number; error?: string };
      if (!res.ok || data.error) {
        throw new Error(data.error || "Request failed");
      }
      setResult(data.result ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [num1, num2, operation]);

  const onSelectOperation = useCallback((op: Operation): void => {
    setOperation(op);
  }, []);

  return (
    <div className="min-h-[calc(100vh-var(--header-height))] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        <div className="p-5 border-b border-border">
          <h1 className="text-xl font-semibold tracking-tight">Calculator</h1>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm" htmlFor="num1">
                Number 1
              </label>
              <input
                id="num1"
                type="number"
                inputMode="decimal"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                className="w-full rounded-lg border border-input bg-background/80 px-4 py-3 focus:ring-2 focus:ring-ring outline-none"
                placeholder="Enter first number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm" htmlFor="num2">
                Number 2
              </label>
              <input
                id="num2"
                type="number"
                inputMode="decimal"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                className="w-full rounded-lg border border-input bg-background/80 px-4 py-3 focus:ring-2 focus:ring-ring outline-none"
                placeholder="Enter second number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm">Operation</span>
            <div className="grid grid-cols-4 gap-2">
              {operations.map((op) => (
                <button
                  key={op.key}
                  type="button"
                  onClick={() => onSelectOperation(op.key)}
                  className={cn(
                    "h-10 rounded-lg border border-input colors-smooth",
                    operation === op.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  aria-pressed={operation === op.key}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onCalculate}
            disabled={isLoading}
            className="w-full h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed colors-smooth"
          >
            {isLoading ? "Calculating..." : "Calculate"}
          </button>

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 text-destructive px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {result !== null && !error && (
            <div className="rounded-lg border border-border bg-background/60 px-4 py-3">
              <div className="text-sm text-muted-foreground">Result</div>
              <div className="text-2xl font-semibold truncate">{result}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Calculator;
