Feature: muon CTA component

    Scenario Outline: muon CTA standard component

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the elements and attributes in the standard component

        Examples:
        |component       |type          |
        |muon-cta        |standard      |

    Scenario Outline: muon CTA disabled component

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the elements and attributes in the disabled component

         Examples:
        |component       |type          |
        |muon-cta        |disabled      |

    
    Scenario Outline: muon CTA loading component

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the elements and attributes in the loading component

         Examples:
        |component       |type          |
        |muon-cta        |loading       |

    
    Scenario Outline: muon CTA hidden component

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the elements and attributes in the hidden component

         Examples:
        |component       |type          |
        |muon-cta        |hidden        |


