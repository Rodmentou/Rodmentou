module.exports = function (api) {

  api.route('/user')
    .get( function (req, res) {
      res.json({success: true, message: 'Not yet implemented but working.'});
    })

    .post( function (req, res) {
      res.json({success: true, message: 'Not yet implemented but working.'});
    })

    .put ( function (req, res) {
      res.json({success: true, message: 'Not yet implemented but working.'});
    })

    .delete( function (req, res) {
      res.json({success: true, message: 'Not yet implemented but working.'});
    });

  api.route('/user/:id')
    .get ( function (req, res) {
      res.json({success: true, message: 'Not yet implemented but working.'});
    })

    .put ( function (req, res) {
      res.json({success: true, message: 'Not yet implemented but working.'});
    })

    .delete( function (req, res) {
      res.json({success: true, message: 'Not yet implemented but working.'});
    });


}
