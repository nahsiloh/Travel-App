import React, { useState } from "react";
import { Button } from "react-bootstrap";

import { ItineraryItem } from "../types";
import ItineraryCard from "./ItineraryCard";
import InputCard from "./InputCard";
import SelectorContainer from "../../UIComponents/SelectorContainer/SelectorContainer";

type DayColumnProps = {
  date: string;
  itinerary: ItineraryItem[];
};

const DayColumn: React.FC<DayColumnProps> = ({ date, itinerary }) => {
  const [showInputCard, setShowInputCard] = useState(false);
  const [isItineraryEdit, setIsItineraryEdit] = useState(false);

  const addInputCard = () => {
    setShowInputCard(true);
  };

  const checkShowInputCard = (isShowInputCard: boolean) => {
    setShowInputCard(isShowInputCard);
  };

  const checkIsItineraryEdit = (isItineraryEdit: boolean) => {
    setIsItineraryEdit(isItineraryEdit);
  };

  return (
    <SelectorContainer
      id={"day_column"}
      style={{ padding: 20 }}
      selectorHeader={
        <div>
          <h2>{date}</h2>
          <Button size="lg" onClick={addInputCard}>
            +
          </Button>
        </div>
      }
      selectorForm={
        <div>
          {itinerary.map((item) => {
            return !isItineraryEdit ? (
              <ItineraryCard
                travelDetail={item}
                checkInputCardFunc={checkShowInputCard}
              />
            ) : (
              <InputCard
                travelDetail={item}
                checkInputCardFunc={checkShowInputCard}
                isExistingItem={true}
              />
            );
          })}
          {showInputCard ? (
            <InputCard
              travelDetail={{
                _id: undefined,
                destination: undefined,
                program: undefined,
                cost: undefined,
                date: date,
              }}
              checkInputCardFunc={checkShowInputCard}
              isExistingItem={false}
            />
          ) : (
            <></>
          )}
        </div>
      }
    />
  );
};

export default DayColumn;
