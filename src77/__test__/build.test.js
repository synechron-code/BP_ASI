import React from "react";
import { render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Build from "../Pages/Build";
class ResizeObserver {
  observe() {}
  unobserve() {}
}
window.ResizeObserver = ResizeObserver;
test("should render web farm Header on Build tab", () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<Build />);
  expect(getByTestId("web-farm-header")).toBeInTheDocument();
});

test("should render v110 version in hdear on Build tab", () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<Build />);
  expect(getByTestId("v110-dropdown")).toBeInTheDocument();
});

test("should render v110 version in hdear on Build tab", () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<Build />);
  expect(getByTestId("v120-dropdown")).toBeInTheDocument();
});

test("should render v110 version in hdear on Build tab", () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<Build />);
  expect(getByTestId("v123-dropdown")).toBeInTheDocument();
});

test("should render topology tab", () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<Build />);
  expect(getByTestId("Topology-menu")).toBeInTheDocument();
});

test("should render blueprint  tab", () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<Build />);
  expect(getByTestId("Blueprint")).toBeInTheDocument();
});

test("should render search box on topology tab", () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<Build />);
  expect(getByTestId("search-box-topology")).toBeInTheDocument();
});

test("should render blueprint  tab", async () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<Build />);
  expect(getByTestId("Blueprint")).toBeInTheDocument();
  await act(async () => {
    // this is kind of ugly, but it works.

    await userEvent.click(getByTestId("Blueprint"));
    expect(getByTestId("blueprint-content")).toBeInTheDocument();
  });
});