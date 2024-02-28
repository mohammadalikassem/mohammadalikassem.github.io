import React, { useEffect } from "react";

export const EmptyPage: React.FC = () => {
  useEffect(() => {
    window.location.reload();
  }, []);

  return (
    <div>
      Loading <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
};
