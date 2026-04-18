import "@playwright/test";

declare module "@playwright/test" {
  interface MakeMatchers<R> {
    shouldBeOneOf(expected: readonly unknown[]): R;
  }
}
