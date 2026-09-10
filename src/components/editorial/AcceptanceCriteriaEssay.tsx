import Link from 'next/link'

export function AcceptanceCriteriaEssay() {
  return (
    <>
      <header className="reading-header">
        <p className="section-label">
          AI sales &amp; implementation · Essay
        </p>
        <h1>
          The acceptance criteria
          <br /> <em>are the product.</em>
        </h1>
      </header>
      <div className="reading-body">
        <p>
          Most AI engagements get sold on a sentence like &quot;help our
          advisors prepare for meetings.&quot;
        </p>
        <p>
          The implementation team inherits every question that sentence leaves
          open. Six months later the demo works, the customer shrugs, and nobody
          can say whether the thing passed.
        </p>
        <p>
          I&#x27;ve built that demo. In 2026 I spent 2 weekends on a
          rep-coaching feature before agreeing with anyone what a sales manager
          should do differently after reading it. The output looked useful. I
          couldn&#x27;t show it changed a single coaching conversation.
        </p>
        <p>
          Building a meeting-preparation agent for a Minneapolis
          wealth-management firm showed me the counter-move. I worked directly
          with the owner to scope the engagement, and before rollout the owner
          signed pass/fail thresholds for retrieval accuracy and unsupported
          claims.
        </p>
        <p>
          The build had a target the customer helped define. That&#x27;s what I
          mean when I say the acceptance criteria are the product: they describe
          the result the buyer is paying us to deliver and the evidence we owe
          them.
        </p>
        <p>
          &quot;Help our advisors prepare for meetings&quot; gives a sales
          conversation a direction. It leaves the implementation team holding
          the decisions.
        </p>
        <p>
          What information belongs in the brief? Which sources should support
          it? What happens when those sources disagree? Who decides whether an
          advisor can use the result?
        </p>
        <p>
          I want those questions answered in the commercial conversation because
          each answer moves the price. A requirement to cite the source behind a
          statement creates work. So does handling a missing document, and so
          does routing a questionable result to a person. The buyer should see
          that cost before committing.
        </p>
        <p>
          Construction figured this out a century ago. A building reaches
          &quot;substantial completion&quot; when it passes the inspections
          named in the contract, and the contract names them before ground
          breaks. An AI engagement deserves the same clause.
        </p>
        <p>
          Technical discovery may still change the plan. When it does, the
          customer and the delivery team revise the promise together. An
          acceptance criterion is an agreement to maintain as we learn.
        </p>
        <p>
          Before calling an evaluation complete, the buyer and the
          implementation team work through:
        </p>
        <ul>
          <li>
            the situations and source material that will judge the workflow
          </li>
          <li>
            what counts as a missing fact, an unsupported claim, or a result
            that needs review
          </li>
          <li>
            who assesses those results, and what threshold they&#x27;ll accept
          </li>
          <li>
            the record that lets the customer inspect the decision and its
            exceptions
          </li>
        </ul>
        <p>
          Those are design questions. The specific checks depend on the
          workflow, which is why selecting the test conditions belongs alongside
          selecting the acceptance threshold.
        </p>
        <p>
          I also want the person doing the work in that agreement. The owner can
          approve the engagement; the advisor can say what they&#x27;d still
          need to verify before trusting the brief. Both belong in the
          definition of a useful result.
        </p>
        <p>
          If you have a deal in flight, stop here and try it: write
          &quot;We&#x27;ll consider this ready to use when…&quot; and finish the
          sentence. If you can&#x27;t, that&#x27;s the next meeting.
        </p>
        <p>
          The meeting-prep agent produced cited, two-page briefs from CRM and
          document-store context. In one session, one advisor finished total
          preparation in under five minutes, including reading the brief and
          checking questionable details.
        </p>
        <p>An average takes more sessions.</p>
        <p>Repeatability takes more advisors.</p>
        <p>A firm-wide time saving takes a documented before-and-after.</p>
        <p>
          One session supports one claim: that advisor, that day, was done in
          under five minutes with the review included.
        </p>
        <p>
          The boundary is commercial, and it cuts both ways. If the promise
          concerns preparation time, the measurement has to include the
          advisor&#x27;s review and corrections. Timing only the generation
          answers a smaller question than the buyer asked.
        </p>
        <p>
          For an AI company, the agreed workflow, the acceptance conditions, and
          the open uncertainties travel from sales to implementation as part of
          the deal. The delivery team can see what the customer expects, how
          that expectation gets checked, and who can accept the result.
        </p>
        <p>
          Before a deal moves forward, the seller, the buyer, and the person
          responsible for delivery each finish the same sentence:
          &quot;We&#x27;ll consider this ready to use when…&quot;
        </p>
        <p>
          The differences in their answers are the work to do while scope and
          expectations can still change.
        </p>
      </div>
      <nav className="reading-next" aria-label="Continue reading">
        <Link href="/work/ria">
          Read the RIA engagement <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </>
  )
}
