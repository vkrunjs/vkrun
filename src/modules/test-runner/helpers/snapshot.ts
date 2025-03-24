import fs from "fs";
import path from "path";
import { testRunner } from "..";

export class Snapshot {
  private getSnapshotDir(testFilePath: string): string {
    return path.join(path.dirname(testFilePath), "__snapshots__");
  }

  private getSnapshotPath(testFilePath: string): string {
    const testFileName = path.basename(testFilePath, path.extname(testFilePath));
    return path.join(this.getSnapshotDir(testFilePath), `${testFileName}.snap`);
  }

  saveSnapshot(testFilePath: string, data: any): void {
    const snapshotDir = this.getSnapshotDir(testFilePath);
    if (!fs.existsSync(snapshotDir)) fs.mkdirSync(snapshotDir, { recursive: true });

    const snapshotPath = this.getSnapshotPath(testFilePath);
    fs.writeFileSync(snapshotPath, JSON.stringify(data, null, 2), "utf-8");
  }

  compareSnapshot(testFilePath: string, data: any): void {
    const snapshotPath = this.getSnapshotPath(testFilePath);

    if (process.argv.includes("--updateSnapshot")) {
      this.saveSnapshot(testFilePath, data);
      testRunner.incrementSnapshotCount();
      console.log(`Updated snapshot: ${snapshotPath}`);
      return;
    }

    if (!fs.existsSync(snapshotPath)) {
      this.saveSnapshot(testFilePath, data);
      testRunner.incrementSnapshotCount();
      console.log(`New snapshot created: ${snapshotPath}`);
      return;
    }

    const expectedData = JSON.parse(fs.readFileSync(snapshotPath, "utf-8"));

    if (JSON.stringify(expectedData) !== JSON.stringify(data)) {
      throw new Error("Snapshot mismatch! Run '--updateSnapshot' to update.");
    }
  }
}
