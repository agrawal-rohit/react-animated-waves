import { useEffect, useState } from "react";
import { Waves } from "../../src";

export function App() {
  const [amplitude, setAmplitude] = useState(20);

    useEffect(() => {
      const timer = setTimeout(() => {
        setAmplitude(Math.random() * 50);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }, [amplitude]);

    return (
      <div className="h-screen flex justify-center items-center">
        <Waves amplitude={amplitude} colors={["#FF6AC6", "#436EDB", "#FF6AC6"]} />
      </div>
    );
}
