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
const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});
class IdcsSmsAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idcs: "",
      telephone: "",
      otpGenrated: "",
      otpVerified: "",
      otp: "",
      regexp: /^[0-9\b]+$/,
      isAlert: false,
      errorMessage: "",
      successMessage: "",
      success: false,
      succes:false,
      successMessag:""
    };
    this.onHandleTelephoneChange = this.onHandleTelephoneChange.bind(this);
    this.onHandleIdcsChange = this.onHandleIdcsChange.bind(this);
    this.generateOtp = this.generateOtp.bind(this);
    this.submitOtp = this.submitOtp.bind(this);
    this.setOtp = this.setOtp.bind(this);
    this.onHandleDialogClose = this.onHandleDialogClose.bind(this);
    this.onHandleSucessDialogClose = this.onHandleSucessDialogClose.bind(this);
    this.onHandleSucessDialog = this.onHandleSucessDialog.bind(this);
  }
  onHandleSucessDialogClose(e) {
    this.setState({ success: false });
  }
  onHandleDialogClose(e) {
    this.setState({ isAlert: false });
  }
  onHandleSucessDialog(e){
	  this.setState({ succes:false }); 
      let url = "/o/idcsSms/getOtp";
      let optURL = url + "/" + this.state.idcs + "/" + this.state.telephone;
      axios.post(optURL, {}).then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data) {
       this.setState({ success: true });
          this.setState({
            successMessage: "Your OTP Is Generated And Sent To Your Phone No.",
          });
          this.setState({
              idcs: "",
              otp: "",
              telephone: "",
              otpGenrated: "",
            });
          
        }
      });
	  
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
    } else {
      this.setState({ isAlert: true });
      this.setState({
        errorMessage: "Please enter valid  10 digit numeric value for IDCS.",
      });
      this.telephone.value = "";
      this.otp.value = "";
      this.setState({ idcs: "" });
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
      this.state.telephone.length === 10 && this.state.idcs.length ===10
    ) {
      let url = "/o/idcsSms/getOtp";
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
    if (this.state.otpGenrated !== "" && this.state.telephone.length === 10) {
      let url = "/o/idcsSms/validateOtp/";

      if (
        this.state.idcs !== "" &&
        this.state.otp !== "" &&
        this.state.telephone !== ""
      ) {
        var otpValidateURL = url + this.state.otp;

        axios.post(otpValidateURL).then((res) => {
          console.log(res.data);
          if (res.data) {
            this.setState({ succes: true });
            this.setState({
              successMessag: "IDCS sent Successfully to your Phone Number",
            });
            this.idcs.value = "";
            this.otp.value = "";
            this.telephone.value = "";
            this.setState({
              otpVerified: res.data,
              userDetails: res.data,
              //idcs: "",
              otp: "",
              //telephone: "",
              otpGenrated: "",
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
              userDetails: "",
            });
            this.setState({ isAlert: true });
            this.setState({
              errorMessage: "You Entered Wrong OTP",
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
          <Dialog open={this.state.succes}>
          <DialogContent>
            <CheckTwoToneIcon />
            {this.state.successMessag}
          </DialogContent>
          <DialogActions>
            <a  onClick={this.onHandleSucessDialog} color="primary">Click to Resend the Sms
            </a>
          </DialogActions>
        </Dialog>
        </div>
      </div>
    );
  }
}

export default IdcsSmsAuth;
