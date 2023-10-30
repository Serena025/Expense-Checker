import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { getBackendURL } from "../common_functions";

function Test() {
  const [category, setCategory] = useState("All");
  const [startDate, setStartDate] = useState("optionA");
  const [endDate, setEndDate] = useState("valueX");
  const [allCategories, setAllCategories] = useState({});
  const [subCategories, setSubCategories] = useState({});
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // State to track the values of parameters
  const [searchParams, setSearchParams] = useState({
    param1: category,
    param2: startDate,
    param3: endDate,
  });

  // Define your functions that need to run when parameters change
  const fetchCategories = async () => {
    console.log("ESH 1");
    try {
      const response = await fetch(`${getBackendURL()}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching categories");
      }

      console.log("ESH 2");

      const data = await response.json();

      console.log("ESH 3");
      let newCategories = {};
      for (let index in data) {
        let newCategory = data[index];
        newCategories[newCategory.id] = newCategory;
      }
      setAllCategories(() => newCategories);
      console.log("New categories", newCategories);
      // console.log("All catgories", allCategories);
      console.log("ESH 4");
    } catch (err) {
      console.error("Error fetching categories data:", err);
      setError(err.message);
    }

    console.log("fetchCategories executed with param:", category);
  };

  // Define your functions that need to run when parameters change
  const fetchSubCategories = async () => {
    console.log("ESH 1a");
    try {
      const response = await fetch(
        `${getBackendURL()}/categories/${category}/subcategories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching subcategories");
      }

      console.log("ESH 2a");

      const data = await response.json();

      console.log("ESH 3a");
      let newSubCategories = {};
      for (let index in data) {
        let newSubCategory = data[index];
        newSubCategories[newSubCategory.id] = newSubCategory;
      }
      setSubCategories(newSubCategories);
      console.log("New Subcategories", newSubCategories);
      console.log("New sub catgories", subCategories);
      console.log("ESH 4a");
    } catch (err) {
      console.error("Error fetching categories data:", err);
      setError(err.message);
    }

    console.log("fetchCategories executed with param:", category);
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${getBackendURL()}/expenses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching expenses");
      }
      const data = await response.json();
      setExpenses(data);

      console.log("fetchExpenses executed!");
    } catch (err) {
      console.error("Error fetching expenses data:", err);
      setError(err.message);
    }
  };

  const function3 = () => {
    // Do something with param3
    console.log("Function 3 executed with param3:", endDate);
  };

  const fetchAll = async () => {
    if (category != "All") {
      await fetchSubCategories();
    }
    await fetchExpenses();
    await function3();
  };

  const fetchCategoryOnLoad = async () => {
    await fetchCategories();
  };

  const f1 = async () => {
    console.log("Expenses", expenses);
    console.log("All categories", allCategories);
    let foundCategories = {};
    for (let index in expenses) {
      let category_id = expenses[index].category_id;
      console.log(category_id);
      let foundCategory = allCategories[category_id];
      foundCategories[category_id] = foundCategory;
    }
    console.log("Found Categories", foundCategories);

    let arrayOfFoundCategories = [];
    for (let item in foundCategories) {
      arrayOfFoundCategories.push(foundCategories[item]);
    }
    console.log("Found categories", arrayOfFoundCategories);
    setExpenseCategories(arrayOfFoundCategories);
  };

  // useEffect to run functions when parameters change
  useEffect(() => {
    // Check if any of the parameters have changed
    if (
      category !== searchParams.param1 ||
      startDate !== searchParams.param2 ||
      endDate !== searchParams.param3
    ) {
      fetchAll();

      // Update the previous parameters
      setSearchParams({ param1: category, param2: startDate, param3: endDate });
    }
  }, [category, startDate, endDate]);

  useEffect(() => {
    fetchCategoryOnLoad();
  }, []);

  useEffect(() => {
    f1();
  }, [expenses, allCategories]);

  return (
    <div>
      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        {expenseCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <label>Parameter 2:</label>
      <select value={startDate} onChange={(e) => setStartDate(e.target.value)}>
        <option value="optionA">Option A</option>
        <option value="optionB">Option B</option>
        {/* Add more options */}
      </select>

      <label>Parameter 3:</label>
      <select value={endDate} onChange={(e) => setEndDate(e.target.value)}>
        <option value="valueX">Value X</option>
        <option value="valueY">Value Y</option>
        {/* Add more options */}
      </select>
    </div>
  );
}

export default Test;
