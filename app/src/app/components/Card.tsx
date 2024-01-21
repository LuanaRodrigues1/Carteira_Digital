import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

interface PropsCard {
  name: string;
  value: number;
  date: string;
  status: boolean;
}

export default function Card({ name, value, date, status }: PropsCard) {
  return (
    <>
      <section className="flex justify-between align-center w-5/12 py-10 px-14 bg-slate-100 rounded-3xl my-7 font-mono text-xl">
        <h4>{name}</h4>
        <h5>{value}</h5>
        <h5>{date}</h5>
        <div>
          {status == false ? (
            <FaArrowCircleDown className="text-red-600 w-6 h-6" />
          ) : (
            <FaArrowCircleUp className="text-green-600 w-6 h-6" />
          )}
        </div>
      </section>
    </>
  );
}
