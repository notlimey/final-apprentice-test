# Tech Stack

[<- Back](/)

## Front-end

For the frontend, I will use Next.js with TypeScript. This is what I have the most experience with and what I know best. Next.js is a well-known and widely used framework in many large projects, so documentation and examples are abundant. TypeScript is great for maintaining structure and predictability in the project. It lets you know what kinds of objects you are working with and what data to expect, and it warns you if something doesn’t match your expectations.

Along with this, I will use a number of packages that I am very familiar with and have good experience using:

-    **Tailwind CSS** as a class/CSS library. I also use SASS instead of CSS because the extra functionality is very handy.
-    **React Hook Form** and **Zod** for form handling and validation.
-    **Lucide React** for icons.
-    **Axios** for data fetching.
-    **@tanstack/react-query** if client-based data fetching is needed.
-    **BiomeJS** for linting and formatting.

### Beneficial Components

-    Various input components (where needed, such as for posting a review). This saves time on form components, which often take up unnecessary time.

## Back-end

For the backend, I have chosen an API solution in .NET. I plan to use a controller-based setup. I choose this over .NET's new minimal API because it’s a more documented pattern. I have a lot of experience with both, but mostly with controller-based setups. Especially regarding authentication, I am much stronger in this area.

I do not plan to use many external packages in this project. It could be Identity, but that’s if I choose it as the authentication provider.

-    **EF Core** for ORM.

If I had more time, I might add Fluent.SMTP to send out emails to users, but I saw that the package is no longer maintained, so I would look for another package.

Authentication can be found here: [KAN-10](https://notlimey.atlassian.net/browse/KAN-10)

## Database

For the database, I will use PostgreSQL. If I choose to upload the project publicly, I will use a free PgSQL instance from Vercel; otherwise, I will host it locally.

## DevOps and tools/applications

DevOps depends greatly on time. My plan is to focus mainly on the project, so any extras will be considered if I have time. However, some things I will use regardless are:

-    Git and GitHub
-    Warp - For the terminal on Mac
-    VSCode
-    Slack, Discord, and Teams for communication
-    Raycast for various LLM and LAM tools like chat and spell checking

If I have time, I will deploy the project, and then I will use the platform [Vercel](https://vercel.com). I choose this because it is best suited for Next.js, and I have a lot of experience with Vercel. I will also use PostgreSQL from Vercel, something I haven’t used before, but it can be exciting to try. I haven’t hosted a database for free before, so I thought it would be cool to try it out. Whether I have time or not is another question. Regardless of whether it becomes part of the task, I will deploy it after the task for additional learning. I can also showcase the task to others on GitHub.

Docker may also be a tool I choose to use to make the project setup as simple as possible for those who want to set it up.

I might use Figma if I choose to go for a design system and not ready-made templates. It’s useful for setting up components there.
