"use client";

import React from "react";

type Props = {
  id: string;
  handleClick: (id: string) => void;
};

const DeleteTodoButton = ({ id, handleClick }: Props) => {
  return <button onClick={() => handleClick(id)}>&#215;</button>;
};

export default DeleteTodoButton;
