import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const CalendarioRDP = () => {
  const [selected, setSelected] = useState<Date>(new Date());
  let footer = <p>Please pick a day.</p>;
  if (selected && selected instanceof Date) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }
  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={footer}
      />
    </div>
  );
};

export default CalendarioRDP;