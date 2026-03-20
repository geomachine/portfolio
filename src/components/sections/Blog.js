"use client";

import { PenTool } from "lucide-react";

const ARTICLE = "active bg-card sketch-border paper-pattern p-6 lg:p-8 transition-all duration-500 relative z-10 block animate-[fadeIn_0.4s_ease_forwards]";

const blogs = [
  { title: "Design conferences in 2022", category: "Design", date: "Feb 23, 2022", text: "Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.", img: "/old/assets/images/blog-1.jpg" },
  { title: "Best fonts every designer", category: "Design", date: "Feb 23, 2022", text: "Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.", img: "/old/assets/images/blog-2.jpg" },
  { title: "Design digest #80", category: "Design", date: "Feb 23, 2022", text: "Excepteur sint occaecat cupidatat non proident, quis nostrum exercitationem.", img: "/old/assets/images/blog-3.jpg" },
  { title: "UI interactions of the week", category: "Design", date: "Feb 23, 2022", text: "Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.", img: "/old/assets/images/blog-4.jpg" },
  { title: "The forgotten art of spacing", category: "Design", date: "Feb 23, 2022", text: "Ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum.", img: "/old/assets/images/blog-5.jpg" },
  { title: "Design digest #79", category: "Design", date: "Feb 23, 2022", text: "Optio cumque nihil impedit quo minus id quod maxime placeat.", img: "/old/assets/images/blog-6.jpg" },
];

export function Blog() {
  return (
    <article className={ARTICLE}>
      <header className="mb-8">
        <h2 className="text-4xl lg:text-5xl font-signature font-bold capitalize relative pb-3 text-foreground flex items-center gap-4">
          Blog
          <div className="flex-1 h-[3px] bg-foreground mt-2" />
        </h2>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog, idx) => (
          <li key={idx} className="group">
            <a href="#" className="block w-full h-full bg-card sketch-border overflow-hidden hover:translate-x-1 hover:translate-y-1 transition-all duration-300 hover:bg-primary-light">
              <figure className="relative overflow-hidden aspect-[1.8/1] border-b-2 border-foreground">
                <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-foreground px-3 py-1 sketch-border text-xs font-bold text-background">
                  <PenTool size={14} /> {blog.category}
                </div>
              </figure>
              <div className="p-5 lg:p-6">
                <time className="block text-xs lg:text-sm text-muted font-bold tracking-widest uppercase mb-2">{blog.date}</time>
                <h3 className="text-2xl font-signature font-bold text-foreground mb-2 leading-snug">{blog.title}</h3>
                <p className="text-muted leading-relaxed line-clamp-2 text-sm lg:text-base">{blog.text}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
