import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./compon/Navbar";
import CreatePage from "./pages/CreatePage";
import { useProductStore } from "./store/product";
import { Toaster } from "@/components/ui/toaster";

function App() {
  // eslint-disable-next-line no-unused-vars
  const { products } = useProductStore();
  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      <Toaster />
    </Box>
  );
}

export default App;
