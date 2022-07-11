@form
Feature: muon form component

    Scenario Outline: muon form standard component with valid

        Given Launch the muon-form component standard type in the browser
        When  User enters values in all fields
        Then User clicks on submit and validate the '<validation>' form
        # And User resets the form

        Examples:
        |validation     |
        |valid          |

    Scenario Outline: muon form standard component with invalid

        Given Launch the muon-form component standard type in the browser
        When  User clicks on submit and validate the '<validation>' form
        # And User resets the form  

        Examples:
        |validation     |
        |invalid        |

    Scenario: muon form standard component with focusing empty field and enter submission

        Given Launch the muon-form component standard type in the browser
        When  User enter the value only in first field and press enter
        Then Validate that the remaining fields are highlighted with error message 


