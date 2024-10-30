# Front-end

## Setup instruction: Required: Node v20

1. Install dependencies: yarn
2. Start development environment: yarn dev
   with .env.local file:
   VITE_API_URL=http://localhost:8080

### Technology choices

- The requirement is to choose ReactJS as front-end library → so I decided to use vite instead of CRA (create-react-app) . Reason: CRA is no longer maintained then its scalability in the future & bug fixes might not be as better as vite
  - CRA use webpack to bundle files, the development might slower than regular one since webpack has to split files into bundles then display it to the browser (faster spin-up), while vite use ESM that improve dev server start time → no need for bundling ⇒ better developer eexperience
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f85f94a8-f0c4-49a7-805c-7432c275d565/e6450781-6a5d-4cee-9837-c296f86321a0/image.png)
  - Using Rollup, Vite provides a faster loading also (built with Go since webpack is built with JS, a single-threaded language)
  ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f85f94a8-f0c4-49a7-805c-7432c275d565/60c6467d-3713-44c7-867f-d110cb0ac372/image.png)
- Chose Vite: Then we need to choose template for our react app:
  - react: regular one
  - react-ts: react with Typesript
  - react-swc:
    > SWC (Speedy Web Compiler) is **an extensible Rust-based platform that can be used for both compilation and bundling**. Using SWC with Nest CLI is a great and simple way to significantly speed up your development process. Hint SWC is approximately x20 times faster than the default TypeScript compiler.
    Since it is also stable at this time, so I do choose react-swc for this project and add TS into it
- React-hook-form, lodash, clsx, zod is widely used by most projects in my opinion, they also have really large community
- MynaUI icon & shadcn: Shadcn is easily customized and quite suitable for the requirement (simple design). Also because it just have to download required components so that we can reduce bundle size → faster load on client
- axios: also a widely-used library that provides a HTTP Client. Using this instead of regular fetch() method improve extendibility of the software

## Completed features

- Enable user to shorten a long url, with password and custom short code
- User can access both protected and unprotected shorten url
- Users cannot access shorted urls after a certain time (30 days in default)

## Issues & Limitations

- The website still not have any store method on client side (ie: localStorage, auth, …)
- Limitation of being DDoS: because there is not any captcha or authorization, so that user can call api calls anytime
- Data leak: Because of the lack of time, I still not map datas properly. Which may cause major bugs in the future

## Suggest ideas for future improvements

- Cache: When scale up, we do need to consider about this
- Traffic count & analytics: Nice to have feature that allows user to see how many clicks have been executed
- Authorization: As above, user need to manage their shorted urls
- Admin Dashboard: To effectively manage a website, this is really important in my opinion
- Advertise on link click: I think this is a good way or either a bad way to earn revenue

## Deployed application

https://kekkei9.github.io/synergieglobal-test-frontend/
