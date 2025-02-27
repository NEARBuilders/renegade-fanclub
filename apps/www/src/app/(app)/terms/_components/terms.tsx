export default function Terms() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-center p-6 text-white text-xs font-medium font-inter leading-relaxed md:text-sm">
      <div className="max-w-xl">
        <h2 className="text-base font-semibold md:text-lg">
          RNG x Sweatcoin Giveaway - Terms & Conditions
        </h2>

        <h3 className="my-4 font-semibold">Eligibility</h3>
        <p className="mb-2">
          The giveaway is open to individuals worldwide, except where prohibited
          by law.
        </p>
        <p className="mb-2">
          Participants must be 18 years of age or older at the time of entry.{" "}
        </p>
        <p className="mb-2">
          Employees, officers, and directors of RNG, Sweatcoin, and their
          respective parent companies, subsidiaries, affiliates, advertising and
          promotion agencies, and their immediate family members and/or those
          living in the same household are not eligible to participate.
        </p>

        <h3 className="my-4 font-semibold">How to Enter</h3>
        <ul className="list-disc pl-5">
          <li>
            Scan the QR code displayed on the RNG x Sweatcoin promotional
            materials.
          </li>
          <li>Sign up with an email address and connect a digital wallet.</li>
          <li>
            NO PURCHASE NECESSARY. A purchase will not increase chances of
            winning.
          </li>
          <li>
            Increase chances by accumulating steps via the Sweatcoin app or
            referring friends.
          </li>
          <li>
            Alternative method: Send a postcard with details to [RNG address]
            for one entry.
          </li>
        </ul>

        <h3 className="my-4 font-semibold">Prizes</h3>
        <ul className="list-disc pl-5">
          <li>
            Main Prizes: Three (3) separate pairs of box seat tickets to the
            Colorado Avalanche vs. Minnesota Wild game on February 28th, 2025,
            at Ball Arena.
          </li>
          <li>
            Secondary Prizes: Gift cards and $20 worth of Sweatcoin (distributed
            to multiple winners).
          </li>
          <li>Total prize value: [Insert total value here].</li>
          <li>Prize details and availability are subject to change.</li>
          <li>
            No cash alternative or prize substitution will be allowed, except at
            the sole discretion of the sponsors.
          </li>
          <li>
            Winners are responsible for any and all taxes and/or fees associated
            with the receipt and/or use of the prizes.
          </li>
          <li>Prizes valued over $600 will be reported as taxable income.</li>
        </ul>

        <h3 className="my-4 font-semibold">Winner Selection & Notification</h3>
        <ul className="list-disc pl-5">
          <li>
            Winners will be selected at random from all eligible entries using a
            certified random number generator.
          </li>

          <li>
            The odds of winning depend on the number of eligible entries
            received.
          </li>

          <li>
            Winners will be announced on February 26th, 27th, and 28th, 2025, at
            the specified times and locations.
          </li>

          <li>
            Winners will also be notified via email and/or through the RNG and
            Sweatcoin apps within 24 hours of the drawing.
          </li>

          <li>
            Winners must claim their prize within 24 hours of the announcement.
            If a winner cannot be contacted or does not claim the prize within
            this time frame, the prize may be forfeited, and an alternate winner
            may be selected.
          </li>

          <li>
            Unclaimed prizes will be returned to the supplier for awarding to
            the alternate winner.
          </li>
        </ul>

        <h3 className="my-4 font-semibold">General Conditions</h3>
        <ul className="list-disc pl-5">
          <li>
            By participating, entrants agree to be bound by these Terms &
            Conditions and the decisions of the sponsors, which are final and
            binding in all respects.
          </li>
          <li>
            Sponsors reserve the right to disqualify any entrant for any reason,
            including but not limited to violation of these Terms & Conditions,
            or any other fraudulent or disruptive behavior.
          </li>
          <li>
            Sponsors are not responsible for any lost, late, incomplete,
            invalid, unintelligible, or misdirected entries, which will be
            disqualified.
          </li>
          <li>
            Sponsors are not responsible for any technical malfunctions, errors,
            or failures of any kind.
          </li>
          <li>
            Sponsors reserve the right to modify or terminate the giveaway at
            any time for any reason, including but not limited to acts of God,
            force majeure, or other circumstances beyond their control.
          </li>
          <li>
            By participating, entrants agree to release and hold harmless
            sponsors and their respective parent companies, subsidiaries,
            affiliates, advertising and promotion agencies, partners,
            representatives, agents, successors, assigns, employees, officers,
            and directors from any and all liability for any injuries, loss, or
            damage of any kind arising from or in connection with the giveaway
            or any prize won.
          </li>
        </ul>

        <h3 className="my-4 font-semibold">Privacy</h3>
        <p>
          Any personal information collected from entrants will be used by
          sponsors for the purposes of administering the giveaway and for other
          marketing purposes, as described in their respective privacy policies.
        </p>
        <p>
          By participating in the giveaway, entrants consent to the collection
          and use of their personal information by sponsors.
        </p>

        <h3 className="my-4 font-semibold">Disclaimer</h3>
        <p>
          This giveaway is in no way sponsored, endorsed, or administered by, or
          associated with, the Colorado Avalanche, the Minnesota Wild, or the
          National Hockey League (NHL).
        </p>

        <h3 className="my-4 font-semibold">Compliance with Colorado Law</h3>
        <ul className="list-disc pl-5">
          <li>
            This giveaway is licensed by the Colorado Secretary of State.
            License number: [Insert license number once obtained]
          </li>

          <li>
            This giveaway complies with the Colorado Consumer Protection Act and
            all applicable Colorado laws and regulations.
          </li>

          <li>
            A copy of these official rules and a list of winners will be
            available at [RNG website] for 90 days following the conclusion of
            the giveaway.
          </li>
        </ul>

        <h3 className="my-4 font-semibold">Governing Law & Jurisdiction</h3>
        <p className="mb-2">
          These Terms & Conditions shall be governed by and construed in
          accordance with the laws of the State of Colorado, without regard to
          its conflict of laws principles.
        </p>
        <p className="mb-2">
          Any and all disputes arising out of or relating to these Terms &
          Conditions or the giveaway shall be resolved exclusively in the state
          or federal courts located in Denver, Colorado.
        </p>

        <h3 className="my-4 font-semibold">Contact Information</h3>
        <p>For inquiries, contact RNG at info@rngfanclub.</p>

        <p className="mt-2">Last Updated: {currentDate}</p>
      </div>
    </div>
  );
}
