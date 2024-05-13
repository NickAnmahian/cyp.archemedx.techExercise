ArcheMedX Tech Exercise:

In order to test the entire workflow you must first run the register_spec.cy.js, and then run the activity_spec.cy.js. 
The activity_spec file uses the cy.login command, and then runs the entire workflow, so it requires that the login is being performed on a fresh account.
Alternatively, you can manually update the "email" fixture in the loginInfo.js fixtures file, and then run activity_spec.

register_spec and activity_spec both run successfully quite consistently. Occasionally, particularly slow load times will cause test failure (timeout).
I've included some cy.wait() commands to try and compensate for this in specific areas, but generally tried to avoid overusing it outside of the video player portion.
(also increased default timeout to 10000).

login_spec works consistently just for testing the login after an account has already been registered.

activity_spec_DEFUNCT is retained as an alternative, but much less granular way of performing the workflow. See Improvement Goals #2.

Improvement Goals:
1. Gain a better understanding of the app code so I can more consistently and appropriately target specific elements.
   - Some elements had unique ids, data-test attributes, or classes.  Others did not, or were difficult to identify just from inspecting
   - There may be more creative ways to uniquely target elements that I'm not aware of.
2. Find a way to split activity_spec into more "it" commands without having to set testIsolation to false in the config.
   - I initially built activity_spec to run the entire workflow as one test, but this didn't seem great.
   - However, the only way I could figure out to create multiple "it" commands within activity_spec was to turn testIsolation to false in the config.
   - Without this, creating a new "it" command will always clear the state of the browser, interrupting the workflow during the activity
   - I'm not a huge fan of this workaround, but it at least makes the cypress readout more comprehensible as it runs the tests, and failure
     in one component won't readout failure for the entire script.
3. Make the tests more granular.
   - I could break my "it" commands down even further, making the tests more modular and easier to debug
   - Definitely important to have activity_spec be more than 1 test, but given the context of the exercise,
     I thought it might not be necessary to increase test execution time for this sake. All I would have to do is further breakdown each of the current tests by
     copy pasting more "it" and cy.origin code around the fundamental test components.
