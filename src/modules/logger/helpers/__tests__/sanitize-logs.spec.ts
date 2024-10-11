import * as fs from 'fs'
import * as path from 'path'
import { sanitizeLogs } from '../sanitize-logs'
import { configLogger } from '../config-logger'

describe('sanitizeLogs', () => {
  const config = configLogger()
  const testDir = path.join(__dirname, 'test-logs')

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true })
  })

  afterEach(() => {
    fs.rmSync(testDir, { recursive: true })
  })

  it('should remove log folders older than expiration date and use default date format', () => {
    const today = new Date()
    const validFolderName = `${today.getDate()}-${today.getMonth() - 2}-${today.getFullYear()}`

    fs.mkdirSync(path.join(testDir, validFolderName), { recursive: true })

    const fileExistsBefore = fs.existsSync(path.join(testDir, validFolderName))
    sanitizeLogs({ ...config, path: testDir })
    const fileExistsAfter = fs.existsSync(path.join(testDir, validFolderName))

    expect(fileExistsBefore).toBeTruthy()
    expect(fileExistsAfter).toBeFalsy()
  })

  it('should remove log files and folders with invalid date format', () => {
    const file1Path = path.join(testDir, 'file1.log')
    const file2Path = path.join(testDir, 'file2.log')

    fs.writeFileSync(file1Path, 'Test log content')
    fs.writeFileSync(file2Path, 'Test log content')

    fs.chmodSync(file1Path, '777')
    fs.chmodSync(file2Path, '777')

    fs.mkdirSync(path.join(testDir, 'invalidFolder'), { recursive: true })

    expect(fs.existsSync(file1Path)).toBeTruthy()
    expect(fs.existsSync(file2Path)).toBeTruthy()

    sanitizeLogs({ ...config, path: testDir })

    expect(fs.existsSync(file1Path)).toBeFalsy()
    expect(fs.existsSync(file2Path)).toBeFalsy()
    expect(fs.existsSync(path.join(testDir, 'invalidFolder'))).toBeFalsy()
  })

  it('should not remove anything if log folder is empty', () => {
    sanitizeLogs({ ...config, path: testDir })

    expect(fs.readdirSync(testDir)).toHaveLength(0)
  })

  it('should remove log folders older than expiration date and use default date format', () => {
    fs.mkdirSync('logs', { recursive: true })
    fs.mkdirSync('logs/01-01-2000', { recursive: true })

    expect(fs.existsSync(path.join('logs', '01-01-2000'))).toBeTruthy()

    sanitizeLogs({ ...config, path: 'logs' })

    expect(fs.existsSync(path.join('logs', '01-01-2000'))).toBeFalsy()
  })

  it('should remove log folders older than expiration date and use specified date format', () => {
    fs.mkdirSync('logs', { recursive: true })
    fs.mkdirSync('logs/01-01-2000', { recursive: true })

    expect(fs.existsSync(path.join('logs', '01-01-2000'))).toBeTruthy()

    sanitizeLogs({ ...config, path: 'logs', dateType: 'DD-MM-YYYY' })

    expect(fs.existsSync(path.join('logs', '01-01-2000'))).toBeFalsy()
  })
})
