import "@testing-library/jest-dom";
import fetch from "cross-fetch";

(global.fetch as unknown as typeof fetch) = fetch;
