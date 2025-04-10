import { chmodSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync, join } from "../../../runtime";
import { sanitizeLogs } from "../sanitize-logs";
import { configLogger } from "../config-logger";

describe("sanitizeLogs", () => {
  const config = configLogger();
  const testDir = join(__dirname, "test-logs");

  beforeEach(() => {
    mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true });
  });

  it("should remove log folders older than expiration date and use default date format", () => {
    const today = new Date();
    const validFolderName = `${today.getDate()}-${today.getMonth() - 2}-${today.getFullYear()}`;

    mkdirSync(join(testDir, validFolderName), { recursive: true });

    const fileExistsBefore = existsSync(join(testDir, validFolderName));
    sanitizeLogs({ ...config, path: testDir });
    const fileExistsAfter = existsSync(join(testDir, validFolderName));

    expect(fileExistsBefore).toBeTruthy();
    expect(fileExistsAfter).toBeFalsy();
  });

  it("should remove log files and folders with invalid date format", () => {
    const file1Path = join(testDir, "file1.log");
    const file2Path = join(testDir, "file2.log");

    writeFileSync(file1Path, "Test log content");
    writeFileSync(file2Path, "Test log content");

    chmodSync(file1Path, "777");
    chmodSync(file2Path, "777");

    mkdirSync(join(testDir, "invalidFolder"), { recursive: true });

    expect(existsSync(file1Path)).toBeTruthy();
    expect(existsSync(file2Path)).toBeTruthy();

    sanitizeLogs({ ...config, path: testDir });

    expect(existsSync(file1Path)).toBeFalsy();
    expect(existsSync(file2Path)).toBeFalsy();
    expect(existsSync(join(testDir, "invalidFolder"))).toBeFalsy();
  });

  it("should not remove anything if log folder is empty", () => {
    sanitizeLogs({ ...config, path: testDir });

    expect(readdirSync(testDir)).toHaveLength(0);
  });

  it("should remove log folders older than expiration date and use default date format", () => {
    mkdirSync("logs", { recursive: true });
    mkdirSync("logs/01-01-2000", { recursive: true });

    expect(existsSync(join("logs", "01-01-2000"))).toBeTruthy();

    sanitizeLogs({ ...config, path: "logs" });

    expect(existsSync(join("logs", "01-01-2000"))).toBeFalsy();
  });

  it("should remove log folders older than expiration date and use specified date format", () => {
    mkdirSync("logs", { recursive: true });
    mkdirSync("logs/01-01-2000", { recursive: true });

    expect(existsSync(join("logs", "01-01-2000"))).toBeTruthy();

    sanitizeLogs({ ...config, path: "logs", dateType: "DD-MM-YYYY" });

    expect(existsSync(join("logs", "01-01-2000"))).toBeFalsy();
  });
});
