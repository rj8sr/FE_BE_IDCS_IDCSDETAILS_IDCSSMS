package be_idcs_sms_services.application;

import java.util.Collections;
import java.util.Set;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.jaxrs.whiteboard.JaxrsWhiteboardConstants;

@Component(property = { JaxrsWhiteboardConstants.JAX_RS_APPLICATION_BASE + "=/idcsSms",
		JaxrsWhiteboardConstants.JAX_RS_NAME + "=IdcsSms.Rest", "auth.verifier.guest.allowed=true",
		"liferay.access.control.disable=true" }, service = Application.class)
public class Be_idcs_sms_servicesApplication extends Application {

	public Set<Object> getSingletons() {
		return Collections.<Object>singleton(this);
	}

	@POST
	@Path("/getOtp/{idcs}/{telephone}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response generateOtp(@PathParam("idcs") String idcs, @PathParam("telephone") String telephone) {
		ResponseBuilder responseBuilder = null;
		responseBuilder = Response.ok(true);
		return responseBuilder.build();
	}

	@POST
	@Path("/validateOtp/{otp}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response validateOtp(@PathParam("otp") String otp) {
		ResponseBuilder responseBuilder = null;
		boolean isValid = false;
		if (otp.equals("9345")) {
			isValid = true;
		}
		responseBuilder = Response.ok(isValid);
		return responseBuilder.build();
	}
}
