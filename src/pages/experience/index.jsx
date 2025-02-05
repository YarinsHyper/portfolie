'use client'
import Head from 'next/head'
import React from 'react'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllExperiences } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'

function Experience({ experience }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        {/* <Card.Title href={`${article.url}`}> */}
        <Card.Title>{experience.title}</Card.Title>
        <Card.Company> {experience.company}
          {experience.site !== '' && <> - <a href={experience.site} target="_blank" rel="noopener noreferrer"
           style={{  textDecoration: 'none' }}
           onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
           onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
             Visit Website
          </a></>}
        </Card.Company>
        <Card.Eyebrow
          as="time"
          dateTime={experience.date}
          className="md:hidden"
          decorate
        >
          {formatDate(experience.date)}
        </Card.Eyebrow>
        <Card.Description>{experience.description}</Card.Description>
        {/* <Card.Cta>Read article</Card.Cta> */}
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={experience.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(experience.date)}
      </Card.Eyebrow>
    </article >
  )
}

export default function ExperienceIndex({ experiences }) {
  return (
    <>
      <Head>
        <title>Experience - Yarin Benisty</title>
        <meta name="description" content="" />
      </Head>
      <SimpleLayout
        title="Experience"
        intro="My professional journey and current experience as a developer."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {experiences.map((experience) => (
              <Experience key={experience.key} experience={experience} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      experiences: (await getAllExperiences()).map(
        ({ component, ...meta }) => meta
      ),
    },
  }
}
