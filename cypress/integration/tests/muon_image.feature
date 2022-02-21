Feature: muon image component

    Scenario Outline: muon image <type> component

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the image src and elements in '<type>' type

        Examples:
        |component       |type          |
        |muon-image      |standard      |
        |muon-image      |background    |