import { useRouter } from "next/router";

export default function () {
  let {
    query: { category },
  } = useRouter();

  return (
    <div className="ml-56 border-b border-gray-400 h-12 flex items-center px-3">
      <div>{category}</div>
    </div>
  );
}
