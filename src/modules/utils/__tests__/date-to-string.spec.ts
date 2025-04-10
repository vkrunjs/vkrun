import { dateToString } from "../date-to-string";

describe("dateToString", () => {
  const dateUTC = new Date("2024-03-05T12:30:45.678Z");
  const dateLocal = new Date("2024-03-05T12:30:45.678");

  it("Should return correct date strings for format YYYY/MM/DD HH:MM:SS.MS", () => {
    expect(dateToString(dateUTC, "YYYY/MM/DD HH:MM:SS.MS")).toBe("2024/03/05 09:30:45.678");
    expect(dateToString(dateUTC, "YYYY/MM/DD HH:MM:SS.MS", "UTC")).toBe("2024/03/05 12:30:45.678");
    expect(dateToString(dateLocal, "YYYY/MM/DD HH:MM:SS.MS")).toBe("2024/03/05 12:30:45.678");
    expect(dateToString(dateLocal, "YYYY/MM/DD HH:MM:SS.MS", "UTC")).toBe("2024/03/05 15:30:45.678");
  });

  it("Should return correct date strings for format YYYY/MM/DD HH:MM:SS", () => {
    expect(dateToString(dateUTC, "YYYY/MM/DD HH:MM:SS")).toBe("2024/03/05 09:30:45");
    expect(dateToString(dateUTC, "YYYY/MM/DD HH:MM:SS", "UTC")).toBe("2024/03/05 12:30:45");
    expect(dateToString(dateLocal, "YYYY/MM/DD HH:MM:SS")).toBe("2024/03/05 12:30:45");
    expect(dateToString(dateLocal, "YYYY/MM/DD HH:MM:SS", "UTC")).toBe("2024/03/05 15:30:45");
  });

  it("Should return correct date strings for format YYYY/MM/DD HH:MM", () => {
    expect(dateToString(dateUTC, "YYYY/MM/DD HH:MM")).toBe("2024/03/05 09:30");
    expect(dateToString(dateUTC, "YYYY/MM/DD HH:MM", "UTC")).toBe("2024/03/05 12:30");
    expect(dateToString(dateLocal, "YYYY/MM/DD HH:MM")).toBe("2024/03/05 12:30");
    expect(dateToString(dateLocal, "YYYY/MM/DD HH:MM", "UTC")).toBe("2024/03/05 15:30");
  });

  it("Should return correct date strings for format YYYY/MM/DD", () => {
    expect(dateToString(dateUTC, "YYYY/MM/DD")).toBe("2024/03/05");
    expect(dateToString(dateUTC, "YYYY/MM/DD", "UTC")).toBe("2024/03/05");
    expect(dateToString(dateLocal, "YYYY/MM/DD")).toBe("2024/03/05");
    expect(dateToString(dateLocal, "YYYY/MM/DD", "UTC")).toBe("2024/03/05");
  });

  it("Should return correct date strings for format YYYY/DD/MM HH:MM:SS.MS", () => {
    expect(dateToString(dateUTC, "YYYY/DD/MM HH:MM:SS.MS")).toBe("2024/05/03 09:30:45.678");
    expect(dateToString(dateUTC, "YYYY/DD/MM HH:MM:SS.MS", "UTC")).toBe("2024/05/03 12:30:45.678");
    expect(dateToString(dateLocal, "YYYY/DD/MM HH:MM:SS.MS")).toBe("2024/05/03 12:30:45.678");
    expect(dateToString(dateLocal, "YYYY/DD/MM HH:MM:SS.MS", "UTC")).toBe("2024/05/03 15:30:45.678");
  });

  it("Should return correct date strings for format YYYY/DD/MM HH:MM:SS", () => {
    expect(dateToString(dateUTC, "YYYY/DD/MM HH:MM:SS")).toBe("2024/05/03 09:30:45");
    expect(dateToString(dateUTC, "YYYY/DD/MM HH:MM:SS", "UTC")).toBe("2024/05/03 12:30:45");
    expect(dateToString(dateLocal, "YYYY/DD/MM HH:MM:SS")).toBe("2024/05/03 12:30:45");
    expect(dateToString(dateLocal, "YYYY/DD/MM HH:MM:SS", "UTC")).toBe("2024/05/03 15:30:45");
  });

  it("Should return correct date strings for format YYYY/DD/MM HH:MM", () => {
    expect(dateToString(dateUTC, "YYYY/DD/MM HH:MM")).toBe("2024/05/03 09:30");
    expect(dateToString(dateUTC, "YYYY/DD/MM HH:MM", "UTC")).toBe("2024/05/03 12:30");
    expect(dateToString(dateLocal, "YYYY/DD/MM HH:MM")).toBe("2024/05/03 12:30");
    expect(dateToString(dateLocal, "YYYY/DD/MM HH:MM", "UTC")).toBe("2024/05/03 15:30");
  });

  it("Should return correct date strings for format YYYY/DD/MM", () => {
    expect(dateToString(dateUTC, "YYYY/DD/MM")).toBe("2024/05/03");
    expect(dateToString(dateUTC, "YYYY/DD/MM", "UTC")).toBe("2024/05/03");
    expect(dateToString(dateLocal, "YYYY/DD/MM")).toBe("2024/05/03");
    expect(dateToString(dateLocal, "YYYY/DD/MM", "UTC")).toBe("2024/05/03");
  });

  it("Should return correct date strings for format MM/DD/YYYY HH:MM:SS.MS", () => {
    expect(dateToString(dateUTC, "MM/DD/YYYY HH:MM:SS.MS")).toBe("03/05/2024 09:30:45.678");
    expect(dateToString(dateUTC, "MM/DD/YYYY HH:MM:SS.MS", "UTC")).toBe("03/05/2024 12:30:45.678");
    expect(dateToString(dateLocal, "MM/DD/YYYY HH:MM:SS.MS")).toBe("03/05/2024 12:30:45.678");
    expect(dateToString(dateLocal, "MM/DD/YYYY HH:MM:SS.MS", "UTC")).toBe("03/05/2024 15:30:45.678");
  });

  it("Should return correct date strings for format MM/DD/YYYY HH:MM:SS", () => {
    expect(dateToString(dateUTC, "MM/DD/YYYY HH:MM:SS")).toBe("03/05/2024 09:30:45");
    expect(dateToString(dateUTC, "MM/DD/YYYY HH:MM:SS", "UTC")).toBe("03/05/2024 12:30:45");
    expect(dateToString(dateLocal, "MM/DD/YYYY HH:MM:SS")).toBe("03/05/2024 12:30:45");
    expect(dateToString(dateLocal, "MM/DD/YYYY HH:MM:SS", "UTC")).toBe("03/05/2024 15:30:45");
  });

  it("Should return correct date strings for format MM/DD/YYYY HH:MM", () => {
    expect(dateToString(dateUTC, "MM/DD/YYYY HH:MM")).toBe("03/05/2024 09:30");
    expect(dateToString(dateUTC, "MM/DD/YYYY HH:MM", "UTC")).toBe("03/05/2024 12:30");
    expect(dateToString(dateLocal, "MM/DD/YYYY HH:MM")).toBe("03/05/2024 12:30");
    expect(dateToString(dateLocal, "MM/DD/YYYY HH:MM", "UTC")).toBe("03/05/2024 15:30");
  });

  it("Should return correct date strings for format MM/DD/YYYY", () => {
    expect(dateToString(dateUTC, "MM/DD/YYYY")).toBe("03/05/2024");
    expect(dateToString(dateUTC, "MM/DD/YYYY", "UTC")).toBe("03/05/2024");
    expect(dateToString(dateLocal, "MM/DD/YYYY")).toBe("03/05/2024");
    expect(dateToString(dateLocal, "MM/DD/YYYY", "UTC")).toBe("03/05/2024");
  });

  it("Should return correct date strings for format DD/MM/YYYY HH:MM:SS.MS", () => {
    expect(dateToString(dateUTC, "DD/MM/YYYY HH:MM:SS.MS")).toBe("05/03/2024 09:30:45.678");
    expect(dateToString(dateUTC, "DD/MM/YYYY HH:MM:SS.MS", "UTC")).toBe("05/03/2024 12:30:45.678");
    expect(dateToString(dateLocal, "DD/MM/YYYY HH:MM:SS.MS")).toBe("05/03/2024 12:30:45.678");
    expect(dateToString(dateLocal, "DD/MM/YYYY HH:MM:SS.MS", "UTC")).toBe("05/03/2024 15:30:45.678");
  });

  it("Should return correct date strings for format DD/MM/YYYY HH:MM:SS", () => {
    expect(dateToString(dateUTC, "DD/MM/YYYY HH:MM:SS")).toBe("05/03/2024 09:30:45");
    expect(dateToString(dateUTC, "DD/MM/YYYY HH:MM:SS", "UTC")).toBe("05/03/2024 12:30:45");
    expect(dateToString(dateLocal, "DD/MM/YYYY HH:MM:SS")).toBe("05/03/2024 12:30:45");
    expect(dateToString(dateLocal, "DD/MM/YYYY HH:MM:SS", "UTC")).toBe("05/03/2024 15:30:45");
  });

  it("Should return correct date strings for format DD/MM/YYYY HH:MM", () => {
    expect(dateToString(dateUTC, "DD/MM/YYYY HH:MM")).toBe("05/03/2024 09:30");
    expect(dateToString(dateUTC, "DD/MM/YYYY HH:MM", "UTC")).toBe("05/03/2024 12:30");
    expect(dateToString(dateLocal, "DD/MM/YYYY HH:MM")).toBe("05/03/2024 12:30");
    expect(dateToString(dateLocal, "DD/MM/YYYY HH:MM", "UTC")).toBe("05/03/2024 15:30");
  });

  it("Should return correct date strings for format DD/MM/YYYY", () => {
    expect(dateToString(dateUTC, "DD/MM/YYYY")).toBe("05/03/2024");
    expect(dateToString(dateUTC, "DD/MM/YYYY", "UTC")).toBe("05/03/2024");
    expect(dateToString(dateLocal, "DD/MM/YYYY")).toBe("05/03/2024");
    expect(dateToString(dateLocal, "DD/MM/YYYY", "UTC")).toBe("05/03/2024");
  });

  it("Should return correct date strings for format HH:MM:SS.MS", () => {
    expect(dateToString(dateUTC, "HH:MM:SS.MS")).toBe("09:30:45.678");
    expect(dateToString(dateUTC, "HH:MM:SS.MS", "UTC")).toBe("12:30:45.678");
    expect(dateToString(dateLocal, "HH:MM:SS.MS")).toBe("12:30:45.678");
    expect(dateToString(dateLocal, "HH:MM:SS.MS", "UTC")).toBe("15:30:45.678");
  });

  it("Should return correct date strings for format HH:MM:SS", () => {
    expect(dateToString(dateUTC, "HH:MM:SS")).toBe("09:30:45");
    expect(dateToString(dateUTC, "HH:MM:SS", "UTC")).toBe("12:30:45");
    expect(dateToString(dateLocal, "HH:MM:SS")).toBe("12:30:45");
    expect(dateToString(dateLocal, "HH:MM:SS", "UTC")).toBe("15:30:45");
  });

  it("Should return correct date strings for format HH:MM", () => {
    expect(dateToString(dateUTC, "HH:MM")).toBe("09:30");
    expect(dateToString(dateUTC, "HH:MM", "UTC")).toBe("12:30");
    expect(dateToString(dateLocal, "HH:MM")).toBe("12:30");
    expect(dateToString(dateLocal, "HH:MM", "UTC")).toBe("15:30");
  });

  it("Should return default format when date type is invalid", () => {
    expect(dateToString(dateUTC, undefined as any)).toBe("2024/05/03 09:30:45.678");
  });
});
