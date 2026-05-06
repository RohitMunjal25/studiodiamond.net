import Link from "next/link";

import { Footer } from "@/components/shared/footer";

import { NavbarShell } from "@/components/shared/navbar-shell";

import { TaskPostCard } from "@/components/shared/task-post-card";

import { SchemaJsonLd } from "@/components/seo/schema-jsonld";

import { buildPostUrl } from "@/lib/task-data";

import { buildTaskMetadata } from "@/lib/seo";

import { fetchTaskPosts } from "@/lib/task-data";

import { SITE_CONFIG } from "@/lib/site-config";



export const revalidate = 3;



export async function generateMetadata() {

  return buildTaskMetadata("profile");

}



export default async function ProfileListPage() {

  const posts = await fetchTaskPosts("profile", 50);

  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");



  const breadcrumbData = {

    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [

      {

        "@type": "ListItem",

        position: 1,

        name: "Home",

        item: baseUrl,

      },

      {

        "@type": "ListItem",

        position: 2,

        name: "Profiles",

        item: `${baseUrl}/profile`,

      },

    ],

  };



  return (

    <div className="min-h-screen bg-gradient-to-br from-[#fdfbf7] via-[#faf8f3] to-[#f6f2ea]">

      <NavbarShell />

      <SchemaJsonLd data={breadcrumbData} />

      

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-[#2a211c] mb-4">All Profiles</h1>

          <p className="text-[#6b584d] mb-8">Browse our collection of professional profiles</p>

        </div>

        

        {posts.length > 0 ? (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">

            {posts.map((profile) => (

              <TaskPostCard

                key={profile.id}

                post={profile}

                href={buildPostUrl("profile", profile.slug)}

                compact

              />

            ))}

          </div>

        ) : (

          <div className="text-center py-16">

            <p className="text-[#6b584d] text-lg">No profiles available at the moment.</p>

            <p className="text-[#8a7265] mt-2">Check back later for new profiles.</p>

          </div>

        )}

      </main>

      

      <Footer />

    </div>

  );

}

