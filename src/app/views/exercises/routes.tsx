
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Counter from "./working-with-context/counter-component/counter";
import Todos from "./working-with-reducer/todos/todos";

// Lazy load route components
const ExpenseTracker = lazy(() => import("./building-form/expense-tracker"));

const routes = () => {
    return (
        <Suspense >
            <Routes>
                <Route path="/expensetracker" element={<ExpenseTracker />} />
                <Route path="/context-counter" element={<Counter />} />
                <Route path="/reducer-todos" element={<Todos />} />
            </Routes>
        </Suspense>
    );
};

export default routes;
