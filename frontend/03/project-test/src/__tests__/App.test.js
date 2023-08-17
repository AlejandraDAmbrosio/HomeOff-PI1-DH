import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; // Para tener expectativas más legibles
import App from "../App";

describe("App Component", () => {
  it('should render without crashing', () => {
    render(<App />);
    const appElement = screen.getByText('Click on the Vite and React logos to learn more');
    expect(appElement).toBeInTheDocument();
  });
});