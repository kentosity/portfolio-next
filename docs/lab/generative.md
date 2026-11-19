# Measured drift

A project begins with a set of constraints and becomes a working system. Measured drift translates that passage into ink: many precise marks accumulate, converge, and make room for one another. Its conceptual seed is the movement between independent parts and a shared purpose. Each print is an interpretation of the project's structure.

The project's original title, ordered technology stack, and content review date form an immutable seed. A small integer generator produces all variation. Stack length determines the number of interacting channels. The same source data and algorithm version always reconstruct the same plate; the archive records that relationship as an edition.

Three meticulously crafted systems share a visual grammar. Data channels bend into a common current. Speech wraps oscillation around a quiet center. Reservations and check-ins occupy interlocking routes. Carefully tuned harmonic relationships produce each composition, with restrained seeded displacement giving the lines a human irregularity.

The implementation balances dense passages against generous unprinted space. Line spacing, interrupted bands, and the meeting of ink colors deserve the same painstaking refinement as the overall silhouette. Screenshots at actual reading sizes guide these decisions: the work must hold together as both a framed object and a close inspection.

Time is held inside the completed plate. SVG paths are generated once, with no drawing loop. Opening a print exposes its construction; an explicit study control changes its variation while the original remains recoverable. The archive uses accessible HTML captions, English and Japanese text, and vector downloads to let the artwork travel beyond its frame.

## Implementation decisions

- Wall `#e7e9e4`, paper `#faf9f2`, graphite `#242722`, cobalt `#3448b5`, rust `#a64b3c`, highlight `#edf0b5`.
- Syne for the archive title; the existing Geist family and system Japanese sans for captions.
- Three framed prints share a hanging line. The middle print sits lower and the outer prints have different mat proportions. Captions align to their frames.
- The first view gives the art most of the available space. The brief's physical archive justifies paper and shadows; the cool wall and geometric type keep the page specific to computational prints.
- Source: the first three featured records in `app/content/career-profile.json`. The review date is extracted from `generated_from`; it is identified as a source review date rather than a project creation date.
- Skills read directly from `anthropics/skills` at `e4bb5d960d87126ff3b3a8af1a104b7db67560ba`: `frontend-design` and `algorithmic-art`, including both algorithmic-art templates. The portfolio brief explicitly permits SVG and directs adapting the isolated study into the site's own presentation.

## Visual review

The first screenshot review led to a shorter introduction and smaller, more widely spaced frames so all three project summaries fit the desktop viewport. The second pass increased caption legibility, exposed the original seeds, and added a language control inside the viewer. Reviewing the open viewer revealed that the global CSS reset removed native dialog centering; explicit centering and initial close-button focus fix the overlay.
