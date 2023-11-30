import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { Home } from "../pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

jest.mock('../hooks/useRanking', () => ({
  useRanking: jest.fn(() => ({
    ranking: [
      { name: 'User1', nivel: 5 },
      { name: 'User2', nivel: 3 },
      { name: 'User3', nivel: 7 },
    ],
    isLoading: false,
    rankingError: null,
  })),
}));

jest.mock('../App', () => ({
  useStatus: jest.fn(() => ({
    status: true,
  })),
}));

describe("Home component", () => {
  it("renders page correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    );

    expect(getByText("Ranking - Top 10")).toBeInTheDocument();
  });

  it("renders home component correctly", async () => {
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getByText("Ranking - Top 10")).toBeInTheDocument();
      expect(getByText("Usuario")).toBeInTheDocument();
      expect(getByText("Nivel")).toBeInTheDocument();
      expect(getByTestId("tbody").children.length).toBe(3);
    });
  });
});
