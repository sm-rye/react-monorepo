import { ReactNode } from "react";

export const metadata = {
  title: "Movie",
  description: "movie에서 나오는 description",
};

export default function MovieLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <span>LAYOUT</span>
      {children}
    </div>
  );
}
