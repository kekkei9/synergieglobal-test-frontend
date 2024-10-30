- The requirement is to choose ReactJS as front-end library → so I decided to use vite instead of CRA (create-react-app) . Reason: CRA is no longer maintained then its scalability in the future & bug fixes might not be as better as vite
  - CRA use webpack to bundle files, the development might slower than regular one since webpack has to split files into bundles then display it to the browser (faster spin-up), while vite use ESM that improve dev server start time → no need for bundling ⇒ better developer eexperience
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f85f94a8-f0c4-49a7-805c-7432c275d565/e6450781-6a5d-4cee-9837-c296f86321a0/image.png)
  - Using Rollup, Vite provides a faster loading also (built with Go since webpack is built with JS, a single-threaded language)
  ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f85f94a8-f0c4-49a7-805c-7432c275d565/60c6467d-3713-44c7-867f-d110cb0ac372/image.png)
- Chose Vite: Then we need to choose template for our react app:
  - react: regular one
  - react-ts: react with
  - react-swc: to replace babel & typescript compiler
    > SWC (Speedy Web Compiler) is **an extensible Rust-based platform that can be used for both compilation and bundling**. Using SWC with Nest CLI is a great and simple way to significantly speed up your development process. Hint SWC is approximately x20 times faster than the default TypeScript compiler.
    Since it is also stable at this time, so I do choose react-swc for this project
