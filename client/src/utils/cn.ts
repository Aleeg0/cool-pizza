export function cn(
  ...args: Array<string | false | 0 | 0n | null | undefined>
) : string {
  args.filter((arg) => !arg || arg.trim().length < 1);
  return args.join(' ');
}