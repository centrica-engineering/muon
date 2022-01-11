Feature: muon CTA component

    Scenario Outline: muon CTA <type> component

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the elements and attributes in the '<type>' component

        Examples:
        |component       |type          |
        |muon-cta        |standard      |
        |muon-cta        |disabled      |
        |muon-cta        |loading       |
        |muon-cta        |hidden        |
        |muon-cta        |standard-link |
        |muon-cta        |disabled-link |
        |muon-cta        |loading-link  |