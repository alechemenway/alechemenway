import Link from 'next/link'

export function WorkflowEssay() {
  return (
    <>
      <header className="reading-header">
        <p className="section-label">Discovery &amp; scoping · Essay</p>
        <h1>
          Understand the workflow
          <br /> <em>before choosing the AI.</em>
        </h1>
      </header>
      <div className="reading-body">
        <p>
          Founders exploring an enterprise use case tend to start with the AI:
          which model, which vendor, build or buy.
        </p>
        <p>
          Start there and you pay for it later, in a pilot that automates the
          wrong step and a review burden nobody scoped.
        </p>
        <p>
          I&#x27;ve paid that bill myself. In 2026 I burned a week comparing
          voice setups for DailyOK, my eldercare product, tuning how the AI
          should sound on a wellness call, while the harder question sat
          unanswered: what should the caregiver reading the summary do next?
        </p>
        <p>
          I start discovery somewhere cheaper: one recent, specific example of
          the customer&#x27;s work. Ask the person who did it to walk through
          what happened, from the request that started it to the point where
          someone accepted the result.
        </p>
        <p>
          Toyota calls the habit genchi genbutsu, &quot;go and see.&quot;
          Managers walk to where the work happens before they change it, because
          the report of the work and the work itself never quite match.
          Discovery is the go-and-see of knowledge work.
        </p>
        <p>
          A label like &quot;meeting preparation&quot; leaves a lot unstated.
        </p>
        <p>Someone gathers the information.</p>
        <p>Someone decides what matters.</p>
        <p>Someone resolves the open questions.</p>
        <p>Someone walks into the room carrying the result.</p>
        <p>
          Each of those someones has a source and a decision attached, and
          that&#x27;s the level of detail I want before we discuss an
          implementation.
        </p>
        <p>
          So I ask the operator to show their steps, including the parts handled
          outside the main system. Where did they look? What did they copy
          between tools? What did they check twice because they didn&#x27;t
          trust the first result?
        </p>
        <p>
          Then I ask the owner what makes the task worth improving. Capacity,
          response time, the cost of correcting mistakes: those are hypotheses
          to test with the customer. Their answer picks the business measure;
          the software category doesn&#x27;t get a vote.
        </p>
        <p>
          The two conversations need to meet. If the owner wants faster
          preparation but the advisor rechecks the entire generated brief, the
          review work belongs in the scope and in the measurement. In my RIA
          engagement, the reported under-five-minute result included that review
          and covered one advisor in one session.
        </p>
        <p>
          For each step, I want to know which source holds the information, who
          can access it, and who maintains it. I also ask what happens when
          information is missing, stale, or contradicted by another source. A
          model choice settles none of that.
        </p>
        <p>
          In the RIA work, the meeting-prep agent connected CRM and
          document-store context to a cited brief for an advisor to review. A
          separate assessment examined role-scoped AI access to portfolio
          systems: I compared two MCP-gateway vendors with a custom build and
          recommended a 90-day read-only pilot.
        </p>
        <p>
          I recommended the pilot. It hasn&#x27;t run. What it shows is how I
          keep the question of access apart from any decision to automate
          actions.
        </p>
        <p>
          Once the people, the process, and the data path are clear, choose a
          bounded piece of work with the customer. Name the person who will use
          the result, the person who can approve it, and the conditions under
          which it would be useful.
        </p>
        <p>
          At that point, build versus buy becomes a concrete comparison: whether
          an existing product handles the required sources and access rules, how
          much setup and review it needs, whether a custom workflow justifies
          the maintenance someone must own, and whether a change to the current
          process would solve enough of the problem on its own.
        </p>
        <p>
          Compare the whole commitment: setup, access, integration, review, and
          ongoing ownership. A subscription price and a build estimate each
          describe part of it.
        </p>
        <p>
          The outcome I want is a short agreement someone can act on: the
          problem worth solving, the workflow it sits inside, the people
          responsible, the information it needs, and the evidence that would
          justify proceeding.
        </p>
        <p>
          For a small or midsize business, that&#x27;s the purpose of a paid
          discovery engagement in my approach. It can end in buying software,
          building a scoped workflow, or keeping the current process, and
          implementation follows whichever decision the work supports.
        </p>
        <p>
          Pick one task from last week and ask the person who did it to walk you
          through it tomorrow. Then see whether the customer can answer this:
          &quot;What are we changing about how this work gets done, and how will
          we know the change helped?&quot;
        </p>
      </div>
      <nav className="reading-next" aria-label="Continue reading">
        <Link href="/writing/acceptance-criteria">
          The acceptance criteria are the product{' '}
          <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </>
  )
}
