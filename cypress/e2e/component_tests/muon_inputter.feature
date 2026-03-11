@inputter
Feature: muon inputter component

    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        When User enter the input
        Then Validate the elements and validation message

        Examples:
        |component       |type          |
        |inputter        |text          |
   
    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the attributes in inputter '<type>' type
        And Validate the helper and tip details in '<type>' field
        And Enter the email in the inputter and validate the message

        Examples:
        |component       |type          |
        |inputter        |email         |

    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the attributes in inputter '<type>' type
        And Validate the helper and tip details in '<type>' field
        And Enter the telephone number in the inputter and validate the message

        Examples:
        |component       |type          |
        |inputter        |tel           |

    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the attributes and elements in '<type>' type
        And Enter the input in '<type>' and validate the value

        Examples:
        |component       |type          |
        |inputter        |search        |
    
    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the attributes and elements in '<type>' type
        And Enter the input in '<type>' and validate the value

        Examples:
        |component       |type          |
        |inputter        |password      |
    

    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the attributes and elements in textarea type
        And Enter the input in textarea and validate the value

        Examples:
        |component       |type          |
        |inputter        |textarea      |

    
    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the attributes in inputter '<type>' type

        Examples:
        |component       |type          |
        |inputter        |disabled      |

    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the attributes and elements in number type
        And Enter the input in number and validate the value

        Examples:
        |component       |type          |
        |inputter        |number        |
    
    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the attributes and elements in select type
        And Select the option and validate the value

        Examples:
        |component       |type          |
        |inputter        |select        |

    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the attributes and elements in mask type
        And Enter the input in the mask and validate the value

        Examples:
        |component       |type          |
        |inputter        |mask          |


     Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the elements in '<type>' type
        And Enter the input in the separator and validate the value

        Examples:
        |component       |type          |
        |inputter        |separator     |

    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the elements in '<type>' type
        And Enter the input in the date-mask and validate the value and message

        Examples:
        |component       |type          |
        |inputter        |date-mask     |

    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the attributes and elements in date type
        And Enter the input in the date and validate the value and message

        Examples:
        |component       |type          |
        |inputter        |date          |

    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the attributes and elements in radio type
        And Select the radio options and validate the value

        Examples:
        |component       |type          |
        |inputter        |radio         |

    Scenario Outline: muon inputter <type> type

        Given Launch the '<component>' component '<type>' type in the browser
        Then Validate the attributes and elements in checkbox type
        And Select the checkbox and validate the value

        Examples:
        |component       |type          |
        |inputter        |checkbox      |
