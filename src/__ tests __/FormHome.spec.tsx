import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { FormHome } from "../components/FormHome";
import { BrowserRouter, Route, Routes, } from "react-router-dom";

// jest.mock('react-router-dom', () => ({
//   useNavigate: jest.fn(() => ({
//     navigate: jest.fn(),
//   }))
// }))

test("FormHome renders correctly", () => {
  const { getByText, getByPlaceholderText } = render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<FormHome />} />
      </Routes>
    </BrowserRouter>
  );

  // Verificar que el componente se renderiza
  expect(getByText("Introduce tu nombre:")).toBeInTheDocument();
  expect(getByPlaceholderText('"Cookie Monster"')).toBeInTheDocument();
  expect(getByText("Jugar")).toBeInTheDocument();
});

test("FormHome submits form with valid input", async () => {
  const { getByPlaceholderText, getByText } = render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<FormHome />} />
      </Routes>
    </BrowserRouter>
  );

  // Introducir un nombre válido en el input
  const input = getByPlaceholderText('"Cookie Monster"');
  fireEvent.change(input, { target: { value: "Test" } });

  // Verificar que el botón esté habilitado
  const submitButton = getByText("Jugar");
  expect(submitButton).toBeEnabled();

  // Simular el envío del formulario
  fireEvent.click(submitButton);
  
//   Verificar que la función navigate se haya llamado con la ruta correcta
    // await waitFor(() => {
  // const navigate = useNavigate();
    
      // expect(navigate).toHaveBeenCalledWith('/game', { state: { name: 'Test' }, replace: true });
    // });
});


