"use client";
import { useState, useEffect } from "react";
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { CiSquarePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoIosSunny } from "react-icons/io";
import { IoMoonOutline } from "react-icons/io5";
import "../index.css";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Container
      maxW={"1140px"}
      px={4}
      borderRadius={10}
      bg={theme === "light" ? "gray.100" : "gray.900"}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22px", sm: "20px" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          background={"linear-gradient(to right, #06B6D4,#3B82F6)"}
          bgClip={"text"}
        >
          <Link to={"/"}>
            Product Store <span style={{ fontWeight: "normal" }}>🛒</span>
          </Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button
              bg={theme === "light" ? "gray.900" : "gray.100"}
              color={theme === "light" ? "gray.100" : "gray.900"}
              aria-label="Create a new product"
            >
              <CiSquarePlus fontSize={20} />
            </Button>
          </Link>
          <Button
            bg={theme === "light" ? "gray.900" : "gray.100"}
            color={theme === "light" ? "gray.100" : "gray.900"}
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
          >
            {theme === "light" ? <IoMoonOutline /> : <IoIosSunny />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};
export default Navbar;
