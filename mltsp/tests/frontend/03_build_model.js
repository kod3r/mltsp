casper.test.begin('build model', function suite(test) {
    casper.start('http://localhost:5000', function() {
        this.page.viewportSize = { width: 1920, height: 1080 };

        if(this.exists('form.login-form')){
            this.fill('form.login-form', {
                'login': 'testhandle@test.com',
                'password':  'TestPass15'
            }, true);
        }

        // Build model
        casper.then(function(){

            this.evaluate(function() {
                document.querySelector('#buildmodel_project_name_select').selectedIndex = 0;
                document.querySelector('#modelbuild_featset_name_select').selectedIndex = 0;
                document.querySelector('#model_type_select').selectedIndex = 0;
                build_model_form_validation();
                return true;
            });
            this.click('#model_build_submit_button');
        });

        casper.then(function(){
            casper.waitForText(
                "New model successfully created",
                function(){
                    test.assertTextExists("New model successfully created",
                                          "New model successfully created");
                },
                function(){
                    test.assertTextExists("New model successfully created",
                                          "New model successfully created");
                },
                10000);
        });

    });

    casper.run(function() {
        test.done();
    });
});
