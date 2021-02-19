import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import ErrorIcon from "@material-ui/icons/Error";
import CheckTwoToneIcon from "@material-ui/icons/CheckTwoTone";
import InputLabel from "@material-ui/core/InputLabel";

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});
class idcsAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idcs: "",
      telephone: "",
      otpGenrated: "",
      otpVerified: "",
      otp: "",
      regexp: /^[0-9\b]+$/,
      textfield: true,
      userDetails: [],
      isAlert: false,
      errorMessage: "",
      successMessage: "",
      success: false,
      authstatus: "",
    };
    this.onHandleTelephoneChange = this.onHandleTelephoneChange.bind(this);
    this.onHandleIdcsChange = this.onHandleIdcsChange.bind(this);
    this.generateOtp = this.generateOtp.bind(this);
    this.submitOtp = this.submitOtp.bind(this);
    this.setOtp = this.setOtp.bind(this);
    this.onHandleDialogClose = this.onHandleDialogClose.bind(this);
    this.onHandleSucessDialogClose = this.onHandleSucessDialogClose.bind(this);
  }
  onHandleSucessDialogClose(e) {
    this.setState({ success: false });
  }
  onHandleDialogClose(e) {
    this.setState({ isAlert: false });
  }

  onHandleTelephoneChange(e) {
    let telephone = e.target.value;
    if (this.state.regexp.test(telephone)) {
      this.setState({ telephone: telephone });
    } else {
      this.setState({ isAlert: true });
      this.setState({
        errorMessage:
          "Please enter valid 10 digit numeric value for Telephone.",
      });
      this.setState({ telephone: "" });
      this.telephone.value = "";
    }
  }

  onHandleIdcsChange(e) {
    let idcs = e.target.value;
    if (idcs !== "" && this.state.regexp.test(idcs)) {
      this.setState({ idcs: idcs });
      let url = "/o/idcsDetails/getDetailsByIdcs";
      let optUrl = url + "/" + idcs;
      axios.get(optUrl).then((res) => {
        if (res.data.length) {
          this.setState({ textfield: false });
          this.setState({ authstatus: "VALID" });
          console.log(res.data);
        } else {
          this.setState({ authstatus: "INVALID" });
          this.telephone.value = "";
          this.otp.value = "";

          this.setState({ telephone: "", textfield: true, userDetails: "" });
        }
      });
    } else {
      this.setState({ isAlert: true });
      this.setState({
        errorMessage: "Please enter valid  10 digit numeric value for IDCS.",
      });
      this.telephone.value = "";
      this.otp.value = "";
      this.setState({ idcs: "", textfield: true });
      this.idcs.value = "";
    }
  }
  setOtp(e) {
    let otpVal = e.target.value;
    this.setState({ otp: otpVal });
  }
  generateOtp() {
    if (
      this.state.regexp.test(this.state.idcs) &&
      this.state.regexp.test(this.state.telephone) &&
      this.state.telephone.length === 10
    ) {
      let url = "/o/idcsDetails/getOtp";
      let optURL = url + "/" + this.state.idcs + "/" + this.state.telephone;
      axios.post(optURL, {}).then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data) {
          this.setState({ otpGenrated: res.data });
          this.setState({ success: true });
          this.setState({
            successMessage: "Your OTP Is Generated And Sent To Your Phone No.",
          });
        }
      });
    } else {
      this.setState({ isAlert: true });
      this.setState({
        errorMessage: "Please Enter 10 Digit Numeric Value For IDCS And Phone",
      });
    }
  }

  submitOtp(e) {
    var id = document.getElementById("idcs").value;
    if (this.state.otpGenrated !== "" && this.state.telephone.length === 10) {
      let url = "/o/idcsDetails/validateOtp/";

      if (
        this.state.idcs !== "" &&
        this.state.otp !== "" &&
        this.state.telephone !== ""
      ) {
        var otpValidateURL = url + this.state.otp;

        axios.post(otpValidateURL, null, { params: { id } }).then((res) => {
          console.log(res.data);
          if (res.data) {
            this.setState({ success: true });
            this.setState({
              successMessage: "Verification Done Successfully.",
            });
            this.idcs.value = "";
            this.otp.value = "";
            this.telephone.value = "";
            this.setState({
              otpVerified: res.data,
              userDetails: res.data,
              idcs: "",
              otp: "",
              telephone: "",
              otpGenrated: "",
              textfield: true,
            });
          } else {
            this.idcs.value = "";
            this.otp.value = "";
            this.telephone.value = "";
            this.setState({
              otp: "",
              idcs: "",
              telephone: "",
              otpGenrated: "",
              textfield: true,
              userDetails: "",
            });
            this.setState({ isAlert: true });
            this.setState({
              errorMessage: "OTP Verification Failed",
            });
          }
        });
      } else {
        this.setState({ otpGenrated: "" });
        this.setState({ isAlert: true });
        this.setState({
          errorMessage: "Generate OTP First.",
        });
      }
    } else {
      this.setState({ otpGenrated: "" });
      this.setState({ isAlert: true });
      this.setState({
        errorMessage: "Generate OTP First",
      });
    }
  }

  render() {
    const { userDetails: userDetails } = this.state;
    return (
      <div id="outer">
        <Typography variant="h3">
          Verifier le numero de mobile et l idcs
        </Typography>
        <FormControl>
          <TextField
            inputRef={(el) => (this.idcs = el)}
            id="idcs"
            label="Enter IDCS"
            onChange={this.onHandleIdcsChange}
            inputProps={{ maxLength: 10 }}
          />
          <TextField
            disabled={this.state.textfield}
            inputRef={(el) => (this.telephone = el)}
            id="telephone"
            label="Enter Telephone"
            onChange={this.onHandleTelephoneChange}
            inputProps={{ maxLength: 10 }}
          />

          <div className="inner">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.generateOtp}
            >
              Generate OTP
            </Button>
          </div>

          <TextField
            inputRef={(el) => (this.otp = el)}
            id="otp"
            label="Enter OTP"
            onChange={this.setOtp}
            inputProps={{ maxLength: 10 }}
          />
          <ThemeProvider theme={theme}>
            <div className="inner">
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={this.submitOtp}
              >
                Submit
              </Button>{" "}
              &nbsp;&nbsp;
              <Button
                variant="contained"
                color="primary"
                className="button"
                type="button"
              >
                Cancel
              </Button>
            </div>
          </ThemeProvider>
        </FormControl>
        <div className="vspace">
          <Typography variant="h4">Result Of your request</Typography>
        </div>
        <div className="vspacein">
          <InputLabel htmlFor="my-input3">
            IDCS Status : {this.state.authstatus}{" "}
          </InputLabel>
        </div>
        <div>
          <Dialog open={this.state.isAlert}>
            <DialogTitle>
              <ErrorIcon />
              INVALID Input
            </DialogTitle>
            <DialogContent>{this.state.errorMessage}</DialogContent>
            <DialogActions>
              <Button onClick={this.onHandleDialogClose} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={this.state.success}>
            <DialogContent>
              <CheckTwoToneIcon />
              {this.state.successMessage}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onHandleSucessDialogClose} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          {userDetails.length
            ? userDetails.map((userDetail) => (
                <div key={userDetail.Idcs}>
                  <div className="vspacein">
                    <InputLabel htmlFor="my-input3">
                      IDCS : {userDetail.Idcs}{" "}
                    </InputLabel>
                  </div>
                  <div className="vspacein">
                    <InputLabel htmlFor="my-input3">
                      Name : {userDetail.Name}{" "}
                    </InputLabel>
                  </div>{" "}
                  <div className="vspacein">
                    <InputLabel htmlFor="my-input3">
                      Age : {userDetail.Age}{" "}
                    </InputLabel>
                  </div>{" "}
                  <div className="vspacein">
                    <InputLabel htmlFor="my-input3">
                      Sex : {userDetail.Sex}{" "}
                    </InputLabel>
                  </div>{" "}
                  <div className="vspacein">
                    <InputLabel htmlFor="my-input3">
                      Email : {userDetail.Email}{" "}
                    </InputLabel>
                  </div>{" "}
                  <div className="vspacein">
                    <InputLabel htmlFor="my-input3">
                      Region : {userDetail.Region}{" "}
                    </InputLabel>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default idcsAuth;
