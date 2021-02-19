package be_idsc_detail_services.application;

import com.pojo.details.IdcsDetails;

import java.util.Collections;
import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.jaxrs.whiteboard.JaxrsWhiteboardConstants;

@Component(property = { JaxrsWhiteboardConstants.JAX_RS_APPLICATION_BASE + "=/idcsDetails",
		JaxrsWhiteboardConstants.JAX_RS_NAME + "=IdcsDeatils.Rest", "auth.verifier.guest.allowed=true",
		"liferay.access.control.disable=true" }, service = Application.class)
public class Be_idsc_detail_servicesApplication extends Application {

	public Set<Object> getSingletons() {
		return Collections.<Object>singleton(this);
	}

	@GET
	@Path("/getDetailsByIdcs/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getDetailsByIdcs(@PathParam("id") String id) {
		ResponseBuilder responseBuilder = null;
		String idcs = IdcsDetails.getData(id);
		responseBuilder = Response.ok(idcs);
		return responseBuilder.build();

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
	public Response validateOtp(@PathParam("otp") String otp, @QueryParam("id") String id) {
		ResponseBuilder responseBuilder = null;
		String isValid = "9345";
		String idcs = IdcsDetails.getData(id);
		if (idcs != null && otp.equals(isValid)) {
			responseBuilder = Response.ok(idcs);
		} else if (idcs == null && otp.equals(isValid)) {
			responseBuilder = Response.ok(false);
		} else {
			responseBuilder = Response.ok(false);
		}

		return responseBuilder.build();

	}

}