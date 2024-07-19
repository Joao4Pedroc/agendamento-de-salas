import { ptBR } from "date-fns/locale";
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ptBR", ptBR);

const DatePickerForm: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (date && startTime && endTime) {
      // Handle the form submission logic here
      console.log({ date, startTime, endTime });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-semibold mb-10">Agendar -nomeSala-</p>
      <form onSubmit={handleSubmit} className="flex items-center flex-col">
        <div className="">
          <div className="">
            <DatePicker
              locale={"ptBR"}
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd/MM/yy"
              placeholderText="Dia"
              required
            />
          </div>
          <div className="">
            <DatePicker
              selected={startTime}
              onChange={(time) => setStartTime(time)}
              locale="ptBR"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              dateFormat="p"
              placeholderText="Horario de entrada"
              required
            />
          </div>
          <div className="">
            <DatePicker
              selected={endTime}
              onChange={(time) => setEndTime(time)}
              locale="ptBR"
              showTimeSelect
              showTimeSelectOnly
              timeFormat="p"
              timeIntervals={30}
              placeholderText="Horario de saída"
              dateFormat="p"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-20 text-black  bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-5 dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none dark:focus:ring-amber-700"
        >
          Agendar Sala
        </button>
      </form>
    </div>
  );
};

export default DatePickerForm;
