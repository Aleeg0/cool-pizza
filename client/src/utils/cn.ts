export function cn(
  ...args: Array<string>
) : string {
  args.filter((arg) => arg.trim().length < 1);
  return args.join(' ');
}